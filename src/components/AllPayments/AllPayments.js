import React, {Component} from 'react';
import axios from 'axios';
import Chart from './../../components/Chart/Chart';

class AllPayments extends Component {
    constructor () {
        super ()
        this.state = {
            payments: [],
            chartData: {},
            currentPage: 1,
            paymentsPerPage: 10

        }
       
    }
    
    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        })
    }

    componentDidMount () {
        axios.get('api/allpayments')
        .then(res => {
            
            this.setState({
                payments: res.data
            })
            this.displayMonthlyTotals()
            
        })
    }

    displayMonthlyTotals = () => {
        let janPayments = [0]
        let febPayments = [0]
        let marPayments = [0]
        let aprPayments = [0]
        let mayPayments = [0]
        let junPayments = [0]
        let julPayments = [0]
        let augPayments = [0]
        let sepPayments = [0]
        let octPayments = [0]
        let novPayments = [0]
        let decPayments = [0]

        this.state.payments.filter(payment => {
            if(payment.date.includes('Jan')){
                janPayments.push(payment.amount)
            }else if(payment.date.includes('Feb')){
                febPayments.push(payment.amount)
            }else if(payment.date.includes('Mar')){
                marPayments.push(payment.amount)
            }else if(payment.date.includes('Apr')){
                aprPayments.push(payment.amount)
            }else if(payment.date.includes('May')){
                mayPayments.push(payment.amount)
            }else if(payment.date.includes('Jun')){
                junPayments.push(payment.amount)
            }else if(payment.date.includes('Jul')){
                julPayments.push(payment.amount)
            }else if(payment.date.includes('Aug')){
                augPayments.push(payment.amount)
            }else if(payment.date.includes('Sep')){
                sepPayments.push(payment.amount)
            }else if(payment.date.includes('Oct')){
                octPayments.push(payment.amount)
            }else if(payment.date.includes('Nov')){
                novPayments.push(payment.amount)
            }else if(payment.date.includes('Dec')){
                decPayments.push(payment.amount)
            }
        })

        console.log(this.state.payments)

         let janTotal = janPayments.reduce((a,b)=>a+b)
         let febTotal = febPayments.reduce((a,b)=>a+b)
         let marTotal = marPayments.reduce((a,b)=>a+b)
         let aprTotal = aprPayments.reduce((a,b)=>a+b)
         let mayTotal = mayPayments.reduce((a,b)=>a+b)
         let junTotal = junPayments.reduce((a,b)=>a+b)
         let julTotal = julPayments.reduce((a,b)=>a+b)
         let augTotal = augPayments.reduce((a,b)=>a+b)
         let sepTotal = sepPayments.reduce((a,b)=>a+b)
         let octTotal = octPayments.reduce((a,b)=>a+b)
         let novTotal = novPayments.reduce((a,b)=>a+b)
         let decTotal = decPayments.reduce((a,b)=>a+b)

         this.setState({
            chartData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets:[
                    {
                        label: 'population',
                        
                        data: [janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, sepTotal, octTotal, novTotal, decTotal],
                        
                        backgroundColor: [
                            'rgba(255,99,132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(16,243,127,1.00)',
                            'rgba(224, 31, 31, 1)',
                            'rgba(224, 150, 31, 1)',
                            'rgba(224, 218, 31, 1)',
                            'rgba(118, 224, 31, 1)',
                            'rgba(31, 182, 224, 1)',
                            'rgba(37, 31, 224, 1)',
                            'rgba(202, 31, 224, 1)',
                            'rgba(224, 31, 53, 1)',
                            'rgba(138, 239, 212, 1)'


                        ]
                    }
                ]
            }  
      
        })

    }    
        
    render () {

        const { payments, currentPage, paymentsPerPage } = this.state;

        const indexOfLastPayment = currentPage * paymentsPerPage;
        const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
        const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

        const renderPayments = currentPayments.map( (payment, index) => {
            return <div key = { index }>
                        ${payment.amount}, {" "}
                        {payment.date}
                   </div>    
        }) 

        const pageNumbers = [];
        for(let i = 1; i <= Math.ceil(payments.length / paymentsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (

                <li key={number}
                    id={number}
                    onClick={this.handleClick}>
                    {number}
                </li>
            )
        })
        
        return (
            <div>

                <div>
                    <ul>
                        {renderPayments}
                    </ul>
                    <ul id='page-numbers'>
                        {renderPageNumbers}
                    </ul>
                </div>
                    <Chart data={this.state.chartData}/>
                    <button onClick={ ()=>this.props.history.push('/dashboard')}>Back</button>
            </div>
        )
    }
}

export default AllPayments;