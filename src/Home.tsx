import * as React from 'react'
import './styles/Home.css'
import {RouteComponentProps} from "react-router";

const CreateButton = ({history}) =>
    <button onClick={() => history.push('/test')}>CREATE</button>

const Home = (props: RouteComponentProps<any>) =>
    <div className="Home">
        <CreateButton history={props.history}/>
    </div>

export default Home


