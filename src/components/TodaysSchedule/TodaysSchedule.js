import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStudentData} from './../../ducks/reducer';
import Button from '@material-ui/core/Button';
import axios from 'axios';
var moment = require('moment');



class TodaysSchedule extends Component {
   
    componentDidMount () {
        this.getTodaysSchedule()
    }

    handleSendReminderText = (phone, time) => {
       axios.post('/api/twilio', {phone, time} )
       .then(res=>{
           console.log('message sent')
       })
    }
    
    getTodaysSchedule = () => {
    
      //map through students
      //add moment property
           let convertedStudentObj = this.props.student.map((student,i)=>{ 
            let splitArr = this.props.student[i].time.split(' ')
             let timeStr = splitArr[0].concat(':').concat(splitArr[1])
             
           student.momentTime = moment.utc(timeStr, "hh:mm:a")._i
           
           return student;
           })
           
      //sort by moment time
           
           let sortedStudents = convertedStudentObj.sort(function(a, b){
              
            if (moment.utc(a.momentTime, "hh:mm:a").isBefore(moment.utc(b.momentTime, "hh:mm:a"))) return -1
                else return 1
           })
          
      //map to return divs
        
        let date = moment()
        let currentDay = (moment(date, "YYYY-MM-DD").format('ddd D MMM')).slice(0, 3)
        let displayedStudents = []
        sortedStudents.map( (student, index) => {
            if (student.day.includes(currentDay)) {
            displayedStudents.push(<div className='todays-students' key={index}>{student.first_name + " " + student.last_name + " " + student.time + " "}
            <button onClick = { ()=>this.handleSendReminderText(student.phone, student.time) } >Send reminder text</button>
            </div>)
            }

            
        })
        
        return displayedStudents;
    }

    render () {
        let date = moment()

        return (
            <div>
                
                <div className='schedule-header'>
                Lessons for {moment(date, "YYYY-MM-DD").format('ddd D MMM')}
                </div>
                <div>
                
                {this.getTodaysSchedule()}

                </div>
                <Button className='back-button' onClick={()=>this.props.history.push('/dashboard')}>Back</Button>
            </div>
        )
    }
}


function mapStateToProps (state) {
    return {
        student: state.student
    }
}

export default connect (mapStateToProps, {getStudentData})(TodaysSchedule)
