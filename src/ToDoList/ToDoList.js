import React, {useState, useEffect} from "react";
import "./ToDoList.css";
import Animation from "./Animation-keter";
import del from "./img/del.svg";
import playlist from "./img/playlist.svg";
import refresh1 from "./img/refresh1.svg";

export function ToDoList(props) {
    const [input,setInput] = useState("");
    const [items,setItems] = useState([]);

    const [edit,setEdit] = useState(false);

    //keep locale storaje
    useEffect(() => {
        let localStorToDo = JSON.parse(localStorage.getItem('todo'));
        localStorToDo && setItems(localStorToDo);
    }, []);

    //add locale storaje
    //in localStorage I have todo= [] =>items
    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(items));
    }, [items]);

    const handleChange = event => {
        setInput(event.target.value);
    };
    //Add
    const hendleAdd = (e) => {
        e.preventDefault();
        setItems([...items, { id: Date.now(), name: input, select: false}]);
        setInput("");
    };
    //Selected
    const hendleSelected = (id) => {
        setItems(
            items.map(item => {
                if (item.id === id){
                    return{
                        ...item,
                        select : !item.select
                    }
                }
                return item;
            })
        )
    };
    //delete
    const hendleDel = (id) => {
        setItems(items.filter(item => item.id !== id))
    };
    //Refresh
    const hendleRefresh = () => {
        setItems("")
    };

    // const hendleEdit = (id) => {
    //     setEdit(!edit);
    //     console.log(id, edit)
    // };
    // const hendleEditing = (event) => {
    //     console.log(event.target.value);
    //     console.log(items.filter(item => item.name === event.target.value));
    // };

    return(
        <div className={"todo"}>
            <div className={"todo_top"}>
                {/*<AnimationGic/>*/}
                <Animation/>
                <img onClick={hendleRefresh} className={"todo_img"} src={refresh1} alt=""/>
                <h1 className={"todo_h1"}>Write your <br/>
                    everyday todos
                </h1>
                <form action="" onSubmit={hendleAdd} className={"todo_form"}>
                    <input type="text" value={input} onChange={handleChange} placeholder={"Your to do"}/>
                    <button disabled={!input || input.trim().length === 0} type="submit">
                        <img src={playlist} alt=""/>
                    </button>
                </form>
            </div>
            <div className={"todo_bottom"}>
                <ul>
                    {
                        items && items.map((item)=>(
                            <li key={item.id} className={"todo_bottom_li"}
                                style={{textDecoration : item.select ? "line-through" : null}}>
                                <span style={{display: edit ? "none":"block"}}>
                                    <input type = "checkbox" checked = {item.select} onChange = {() => hendleSelected(item.id)}/>
                                    <span className={"todo_bottom_text"}>{item.name}</span>
                                </span>

                                <button className={"Delete"} type={"submit"} onClick={() => hendleDel(item.id)}>
                                    <img src={del} alt=""/>
                                </button>

                                {/*<input  style={{display: !edit? "none":"block"}} onChange={(event) =>hendleEditing(event)} type="text" value={item.name} />*/}
                                {/*<button className={"Edit"} type={"submit"} onClick={() => hendleEdit(item.id)}>*/}
                                    {/*{edit ? "Save": "Edit"}*/}
                                {/*</button>*/}
                            </li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    )
}