import TypewriterEffect from 'typewriter-effect';

const Typewriter = (props: {word: string, isVisible: boolean}) => {
    return (
        <>
            {props.isVisible && (
                <span>
                    <TypewriterEffect onInit={(typewriter) => {
                        typewriter.typeString(props.word).start()
                    }} />
                </span>
            )}
        </>
    )
}

export default Typewriter
