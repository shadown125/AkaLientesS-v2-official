import {useContext, useEffect, useState} from "react";
import Progress from "../NProgress/Progress";
import {InitialLoadContext} from "../context/initialLoadContext";

const InitialPageLoader = () => {
    const [activeInitialLoaderSection, setActiveInitialLoaderSection] = useState<string>('')
    const [activeFirstPaint, setActiveFirstPaint] = useState<string>(' is-active')
    const [activeLastPaint, setActiveLastPaint] = useState<string>('')
    const [progressLoaderState, setProgressLoaderState] = useState<boolean>(false);

    const {loadState, setLoadState} = useContext(InitialLoadContext)

    useEffect(() => {
        const body = document!.querySelector('body');
        const delay = 3500

        if (body!.style.overflow != 'unset') {
            body!.style.overflow = 'hidden'
        }
        const progressLoadingAnimation = setTimeout(() => {
            setActiveFirstPaint('')
            setActiveLastPaint(' is-active')
            setProgressLoaderState(true)
        }, delay)

        const secondPaintLoading = setTimeout(() => {
            setActiveLastPaint('')
            setActiveInitialLoaderSection(' is-active')
        }, delay + 3000)

        const finishLoadingPaint = setTimeout(() => {
            setLoadState(true)
            body!.style.overflow = 'unset'
        }, delay + 4000)

        return () => {
            clearTimeout(progressLoadingAnimation)
            clearTimeout(secondPaintLoading)
            clearTimeout(finishLoadingPaint)
        }
    }, [loadState, setLoadState])

    return(
        <>
            {!loadState ? (
                <section className={`initial-page-loader${activeInitialLoaderSection}`}>
                    <div className="wrapper">
                        <div className="container">
                            <div className={`first-paint${activeFirstPaint}`}>
                                <div className="loader">
                                    <div className="outer"/>
                                    <div className="middle"/>
                                    <div className="inner"/>
                                </div>
                                <Progress isAnimating={!progressLoaderState} minimum={0.1} key={0} animationDuration={0}
                                          isFinished={progressLoaderState} progress={0} incrementDuration={90}  />
                            </div>
                            <div className={`last-paint${activeLastPaint}`}>
                                <h1 className="headline h1">
                                    <span>AKALIENTESS</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <></>
            )}
        </>
    )
}

export default InitialPageLoader
