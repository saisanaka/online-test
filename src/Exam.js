import React ,{ useEffect } from 'react';
import './Exam.css';
import { useStateValue } from './StateProvider';
import {useHistory} from 'react-router-dom';

function Exam() {

    const my_ans = [];
    const history = useHistory()
    const [{questions} , dispatch] = useStateValue()
    useEffect(()=>{
        dispatch({
            type: "clear",
        })
    },[])
    var answers = [];
    for(let i=0;i<questions.length;i++){
        answers.push(-1)
    }
    var submit_answer = false;
    for(let i=0;i<questions.length;i++){
        my_ans.push(i+1)
    }

    const check = () =>{
        for(let i=0;i<answers.length;i++){
            if(answers[i] === -1) {
                return false
            }
        }
        return true
    }

    const submitted = () =>{
        if(!check()){
            if(window.confirm("Some of your questions are not answered. \nDo you still want to continue")){
                submit_answer=true
            }
        }else{
            if(window.confirm("Do you want to submit")){
                submit_answer=true
            }
        }
        if(submit_answer){
            answers?.map((item) => {
                my_ans.splice(parseInt(item.id)-1,1,item)
            })
            answers?.map((item) =>{
                dispatch({
                    type: "Add_ans",
                    item: item,
                })
            }
                
            )
           history.push("/submit") 
        }

    }
    const add__value = async(e) =>{
        var new__option;
        var found = false;
        answers?.map((item)=>{
            if(item?.id == e.target.name){
                found = true;
                item.option = e.target.value.toString()
            }
        })
        if(answers.length && !found){
                new__option = {
                    id: e.target.name,
                    option: e.target.value.toString()
                }
                answers[parseInt(e.target.name)-1]=new__option;
        }
    }
  return (
    <div className='exam__class'>
        {questions?.map((item)=>{
            return <>
            <div className='question'>
                <p>{item["id"]}. {item["question"]}</p>
            </div>
            <div  className='options__class'>
                <input type="radio" onChange={e=>add__value(e)} value="a" name={`${item["id"]}`} /> A. {item["option_a"]} <br />
                <input type="radio" onChange={e=>add__value(e)} value="b" name={`${item["id"]}`} /> B. {item["option_b"]} <br />
                <input type="radio" onChange={e=>add__value(e)} value="c" name={`${item["id"]}`} /> C. {item["option_c"]} <br />
                <input type="radio" onChange={e=>add__value(e)} value="d" name={`${item["id"]}`} /> D. {item["option_d"]} <br />
            </div>
            </>
        })}
        
        <button onClick={submitted}>Submit</button>
    </div>
  )
}

export default Exam;