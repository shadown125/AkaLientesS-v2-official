// @ts-ignore
import {Curtains} from 'react-curtains';
import FactsImagePlane from "./FactsImagePlane";

const FactsCurtain = (props: {
    image: string,
    headline: string
}) => {
    return (
        <Curtains production={true}>
            <FactsImagePlane image={props.image} headline={props.headline} />
        </Curtains>
    )
}

export default FactsCurtain
