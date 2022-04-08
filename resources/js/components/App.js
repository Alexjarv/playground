import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'

import { Context } from '../app';

import AppRouter from './AppRouter';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

import { getUser } from '../http/userAPI';

const App = observer(() => {

    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser().then(res => {
            if(res.status == 200){
                user.setIsAuth(true);
                user.setUser(res.data);
            }
            console.log(res.data);
        }).finally(() => {
            setLoading(false);
        })
    })

    if(loading){
        return <Spinner animation={'border'} variant={'primary'}/>
    }
    return (
          <BrowserRouter>
              <Sidebar/>
              <Navbar/>
              <AppRouter/>
          </BrowserRouter>
    );
})

export default App;


