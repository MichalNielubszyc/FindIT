import  {NavBar} from '../components/navBar/NavBar';
import "../styles/MainPage.css"
import Post from '../components/Post'
import {MainPageWrapper} from '../common/MainPageWrapper'
import ModalToCreatePost from '../components/ModalToCreatePost'
import React, {useState, useEffect} from 'react';
import fire from '../fire';
import { DeveloperModeSharp, PostAddSharp, Unsubscribe } from '@material-ui/icons';
export default function MainPage() {
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [posts,setPosts]=useState([])
    function toggleModal(){
        
      
         
            setIsModalOpen(current => !current)
        
    }
    
    useEffect(() => {
        const unsubscribe = fire.firestore().collection("Posts").onSnapshot((querySnapshot) => {
            const posts = []
            querySnapshot.forEach((doc) => {
               posts.push({
                   id: doc.id,
                   ...doc.data()
               })
              
            });
            setPosts(posts)
        });

        return () => {
            unsubscribe()
        }
    }, [])
    
    

    return (
        <>
        <MainPageWrapper>
            <div className="page">
            <div className="body">
        <div id="body"className="bodyOfPage">
            <div className="buttonSection">
                    <button onClick={toggleModal} className="btn btn-writeMessage">Write a message</button>
                    <button className="btn-sortBy">Sort by: <b>Popular</b> v</button>
            </div>
            </div>
            {
                posts.map(post=><h3 key={post.id}>{post.title}</h3>)
               
            }
            
            
            <NavBar/>
            </div>
            </div>
            </MainPageWrapper>
            <ModalToCreatePost isModalOpen={isModalOpen} toggleModal={toggleModal}/>
    </>)
  }
  
   