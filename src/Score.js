import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Score.css'
import { useStateValue } from './StateProvider'


function Score() {
    const [{questions , answers}] = useStateValue();
    const history = useHistory()
    var abc;
    var score=0;
    abc=[...answers]
    for(let i=0;i<abc.length;i++){
        if(abc[i] === -1){
            const data = {
                id: i+1,
                option: "NA",
                actual: questions[i]?.actual__answer
            }
            abc[i]= data;
        }else{
            abc[i].actual = questions[i]?.actual__answer;
        }
    }
    abc.map((item) => {
        if(item.option === item.actual){
            score++
        }
    })
  return (
    <div className='score__class'>
        <h2> Your Score : {score}  </h2>
        
        <div className='displaying__contents'>
             <table>
                <tr>
                    <th>Q.no</th>
                    <th>Your Answer</th>
                    <th>Actual Answer</th>
                    <th>Mark</th>
                </tr>
                {abc?.map((item)=>{
                    return <tr>
                    <td>{item["id"]}</td>
                    <td>{item["option"]}</td>
                    <td>{item["actual"]}</td>
                    <td>{(item["actual"] === item["option"]) ? '1' : '0'}</td>
                    </tr>
                })}
            </table>
            
        </div>
        <button><Link to="/">OK</Link></button>
    </div>
  )
}

export default Score