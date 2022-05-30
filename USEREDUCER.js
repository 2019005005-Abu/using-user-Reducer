import React,{useState,useReducer} from 'react'
const booksData=[
{id:1,name:"Pather Panchal"},
{id:2,name:"Padma Nadir Majhi"},
{id:3,name:"Srikanta"}
]
const USEREDUCER = () => {
    // const [books, setBooks] =useState(booksData);
    // const [modalText,setModalText]=useState("");
    // const [isModalOpen,setisModalOpen]=useState(false);
    
   
    const reducer=(state,action)=>{
        //ACTION.TYPE
        //ACTION.PAYLOAD
        if(action.type==='ADD'){
            const allBooks=[...state.books,action.payload]
            return{
                ...state,
                books:allBooks,
                isModalOpen:true,
                modalText:"Book is add"
            }
        }
        if(action.type==='REMOVE'){
            const filterName=[...state.books]
            .filter(book=>book.id!=action.payload);
            return{
                ...state,
                books:filterName,
                isModalOpen:true,
                modalText:'book is removed'
            }
        }
        
    }
  
    const [booksState,dispatch]=useReducer(reducer,{
        books:booksData,
        isModalOpen:false,
        modalText:" "
    });

    const Modal=({modalText})=>{
        return  <p>{modalText}</p>
    }

    const [bookName,setBookName]=useState(" ");
    const handleSubmit=e=>{
     e.preventDefault()
         const newBook={
             id:new Date().getTime().toString(),
             name:bookName
         }
         dispatch({
            type:'ADD',
            payload:newBook
         }) ;
         setBookName('');  
    }
    const RemoveBook=(id)=>{
        dispatch({
            type:'REMOVE',
            payload:id
        })
    }
  return (
    <div>
     <h3>Books-List</h3>
     <form onSubmit={handleSubmit}>
        <input 
        type='text'
        value={bookName}
        onChange={(e)=>{
            setBookName(e.target.value)
        }}
        />
        <button type="submit">Add-Book</button>
     </form>

     {booksState.isModalOpen 
     && <Modal 
     modalText={booksState.modalText}
     />}

     {booksState.books.map((book)=>{
         const{id,name}=book
         return(
             <li 
             key={id}>
            {name}
            <button style={{
            marginLeft:'20px',
            color:'grey',
            }}onClick={()=>
            {RemoveBook(id)}}>X</button>
         </li>
         )
     })}
    </div>
  )
}

export default  USEREDUCER