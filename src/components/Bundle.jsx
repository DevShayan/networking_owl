import { Link } from "react-router-dom";
import "./Bundle.css"

export default function Bundle(props) {
    return (
        <div id="bundle">
            <img src={ props.img } alt="" />
            <h3>{ props.title }</h3>
            <p id="list">{ props.l1 }</p>
            <p id="list">{ props.l2 }</p>
            <p id="list">{ props.l3 }</p>
            <p id="list">{ props.l4 }</p>
            <p id="price">Price: { props.price } PKR</p>
            <Link to={`/order-conf?index=${props.index}`}><button>buy now</button></Link>
        </div>
    );
}