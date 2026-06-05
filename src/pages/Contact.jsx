import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { db } from "../firebase.config";
import { toast } from "react-toastify";


function Contact() {
    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState('')
    const [searchParams,getSearchParams] = useSearchParams()
    const params = useParams();
    
    useEffect(() => {     
        const fetchLandlord= async()=> {
            try {
                const docRef = doc(db, 'users', params.landlordId)
                
                const docSnap = await getDoc(docRef)
                
                if (docSnap.exists()) {
                    setLandlord(docSnap.data())
                }
                else {
                    toast.error('Could not fetch landlord')
                }
            } catch (error) {
                toast.error('Could not fetch landlord')    
            }
        }
        
        fetchLandlord()
        
    },[params.landlordId])
    
    const onChange = (e) => {
        setMessage(e.target.value)
    }
    
    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Contact Owner</p>
            </header>
            
            {landlord !== null && (
                <main>
                    <div className="contactLandlord">
                        <p className="landlordName">Contact {landlord?.name}</p>
                    </div>
                    <form action="" className="messageForm">
                        <div className="messageDiv">
                            <label htmlFor="message" className="messageLabel">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                cols="30"
                                rows="10"
                                className="textarea"
                                onChange={onChange}
                                value={message}
                            ></textarea>
                            
                        </div>
                        
                        <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                            <button type="button" className="primaryButton">Send Message</button>
                        </a>
                    </form>
                </main>
            )}
            
        </div>                         
    )
}

export default Contact