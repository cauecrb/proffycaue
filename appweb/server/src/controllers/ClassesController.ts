import {Request, Response} from 'express';
import db from '../database/connection'
import convertHourToMinuts from '../utils/convertHourToMinuts';

interface scheduleItens{
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController{
    async index(request: Request,response: Response){
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error:"Faltam filtros para a busca"
            })
        }

        const timeInMinutes = convertHourToMinuts(time);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
             })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    };

    async Create(request: Request,response: Response) { 
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction();
        
        try{
            const InsertUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio, 
             })
         
             const user_id = InsertUsersIds[0];
         
             const InsertedClassesIds = await trx('classes').insert({
                 subject,
                 cost,
                 user_id,
             })
         
             const class_id = InsertedClassesIds[0];
         
             const class_schedule = schedule.map((scheduleItens: scheduleItens) => {
                 return {
                     class_id,
                     week_day: scheduleItens.week_day,
                     from: convertHourToMinuts(scheduleItens.from),
                     to: convertHourToMinuts(scheduleItens.to),
                 }
             })
         
             await trx('class_schedule').insert(class_schedule);
         
             await trx.commit();
    
             return response.status(201).send();          
        }catch (err) {
            await trx.rollback();
            return response.status(400).json({
                error: 'Erro inesperado ao criar nova aula'
            })
        }
    
    };
}