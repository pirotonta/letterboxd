import './Review.css';
import { EyeOff, Icon } from 'lucide-react';


const Review = () => {

    return (
        <div className="review">
            <div className="stars">
            <input type="radio" id="star5" name="review" value="5"/>
            <label className="star" htmlFor="star5" title="epica" aria-hidden="true"></label>
            <input type="radio" id="star4" name="review" value="4" />
            <label className="star" htmlFor="star4" title="copada" aria-hidden="true"></label>
            <input type="radio" id="star3" name="review" value="3" />
            <label className="star" htmlFor="star3" title="buena" aria-hidden="true"></label>
            <input type="radio" id="star2" name="review" value="2" />
            <label className="star" htmlFor="star2" title="no mala" aria-hidden="true"></label>
            <input type="radio" id="star1" name="review" value="1" />
            <label className="star" htmlFor="star1" title="mala" aria-hidden="true"></label>
            </div>
            <div className="no-vista">
            <input type="radio" id="novista" name="review" value="no la vi" />
            <label className="novista" htmlFor="novista" title="no la vi" aria-hidden="true"><EyeOff xHeight={20}/></label>
            </div>
        </div>
    )
}

export default Review;

