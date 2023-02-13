import React, { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import './App.css'
import axios from "axios"
import { AiTwotoneDelete, AiFillEdit, AiFillEye, AiOutlinePlus } from 'react-icons/ai';
export const Todo = () => {
    const [Api, setApi] = useState([])
    const [click, setClick] = useState(true)
    const [Edit, setEdit] = useState(true)
    const [View, setView] = useState(true)
    const [id, setId] = useState('')
    const [name, setName] = useState('')

    // Initial List
    const Apicall = async () => {
        try {
            let Api = await axios.get("http://localhost:2000/users")
            let res = await Api.data
            setApi(res)
        } catch (error) {
            console.log(error);
        }
    }

    // Adduser List
    let saveData = async () => {
        if (!name) {
            alert("Please fill the form first")
        }

        try {
            await axios.post("http://localhost:2000/users", { name })
            setClick(false)
        } catch (error) {
            console.log(error);
        }
    }

    //Edit List
    let editList = async (id) => {
        const editData = Api.find((elem) => {
            return elem.id === id;
        })
        setName(editData.name);
        setEdit(false)
        setView(true)
        setId(id)
    }

    //Edit List completed
    const Editcomplete = async () => {
        try {
            let update = await axios.put(`http://localhost:2000/users/${id}`, { name })
            let res = await update.data;
            setApi([res.name])
        } catch (error) {
            console.log(error);
        }
        setEdit(true)
        setClick(false)
        setName('')
    }

    //View List
    const viewList = (id) => {
        const findId = Api.find((e) => {
            return e.id === id
        })
        setName(findId.name)
        setView(false)
    }

    // Delete List
    let delList = async (id) => {
        try {
            await axios.delete(`http://localhost:2000/users/${id}`)
        } catch (error) {
            console.log(error);
        }
        setClick(false)
    }


    // InitialCall
    useEffect(() => {
        Apicall()
    }, [])


    return (
        <>
            {click
                ?
                <div className="container">
                    <div className="row bg-primary rounded-2 shadow">
                        <div className="col-lg-12">

                            <div className="todo-top">
                                <div className="heading text-center text-white">
                                    <h2>Todo App With Json-Server</h2>
                                </div>

                                <div className="input">
                                    {View
                                        ?
                                        <div className="input d-flex justify-content-center">
                                            <input type="text" className='form-control w-50 h-50' value={name} onChange={(e) => setName(e.target.value)} />
                                            <p>{Edit ? <button className='btn bg-white save' onClick={saveData}><AiOutlinePlus /></button> : <button className='btn bg-white ms-1 save'><AiFillEdit onClick={() => Editcomplete()} /></button>}</p>
                                        </div>

                                        :
                                        <div className='input d-flex justify-content-center'>
                                            <input type="text" className='form-control w-50 h-50' value={name} />
                                        </div>
                                    }
                                </div>


                            </div>
                            <div className="col-lg-12">
                                <div className="todo-bottom ">
                                    <div className=' d-flex justify-content-center my-5'>
                                        <ul className='list-group w-100 rounded-4'>
                                            <Scrollbars style={{ width: "100%", height: '20rem' }} className=" rounded-2">
                                                {Api.map((e, i) => {
                                                    return (
                                                        <>
                                                            <li className='list-group-item d-flex justify-content-between'>
                                                                {e.name}
                                                                <p className=' fs-4 d-flex align-content-center'> <span className='view'><AiFillEye onClick={() => viewList(e.id)} /></span>  <span className='edit'><AiFillEdit onClick={() => editList(e.id)} /></span> <span className='delete'><AiTwotoneDelete onClick={() => delList(e.id)} /></span> </p>
                                                            </li>
                                                        </>
                                                    )
                                                })}
                                            </Scrollbars>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                :
                <Todo />
            }
        </>
    )
}






