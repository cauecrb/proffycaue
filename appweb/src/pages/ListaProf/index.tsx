import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'

import './styles.css'
import TeacherItem, { Prof } from '../../components/ProfItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'


function TeacherList() {

    const [teachers, setTeachers] = useState([])

    const [subject, setSubjet] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    async function searchTeachers(e: FormEvent) {
      e.preventDefault()

      console.log({subject, week_day, time})

     const response =  await api.get('/classes', { params: {
        subject, week_day, time
      } })


      setTeachers(response.data)

    }


    return (
       <div id="page-teacher-list" className="container">
          <PageHeader title="As consultas são feitas no Banco de Dados de acordo com seu filtro"
          description="tente Computação, 2a, entre 07:00 e 22:00">
            <form id="search-teachers" onSubmit={searchTeachers}>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={e => setSubjet(e.target.value)}
              options={[
                { value: 'Computação', label: 'Computação' },
                { value: 'JavaScript', label: 'JavaScript' },
                { value: 'NodeJS', label: 'NodeJS' },
                { value: 'Banco de Dados', label: 'Banco de Dados' },
            ]} />

             <Select
              name="week_day"
              label="Dia da semana"
              value={week_day}
              onChange={e => setWeekDay(e.target.value)}
              options={[
                { value: '0', label: 'Domingo' },
                { value: '1', label: 'Segunda-feira' },
                { value: '2', label: 'Terça-feira' },
                { value: '3', label: 'Quarta-feira' },
                { value: '4', label: 'Quinta-feira' },
                { value: '5', label: 'Sexta-feira' },
                { value: '6', label: 'Sábado' },
            ]} />

              <Input
               type="time"
               name="time"
               label="Hora"
               value={time}
               onChange={e =>
                 setTime(e.target.value)}
              />

            <button type="submit">Buscar</button>
            </form>
          </PageHeader>

        <main>
         {
           teachers.map((teacher: Prof) => <TeacherItem key={teacher.id} prof={teacher} />)
         }
        </main>

       </div>
    )
}

export default TeacherList