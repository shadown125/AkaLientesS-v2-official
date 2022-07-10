import Image from "next/image";
// @ts-ignore
import {Curtains} from 'react-curtains';
import FactsImagePlane from "./FactsImagePlane";

const FactsCurtain = (props: {
    image: string,
    headline: string
}) => {
    return (
        <Curtains production={true}>
            <FactsImagePlane image={props.image} headline={props.headline}>
                <Image priority={true} layout={"fill"} src={props.image} alt={props.headline} data-sampler="imagePlaneTexture" />
            </FactsImagePlane>
        </Curtains>
    )
}

export default FactsCurtain
