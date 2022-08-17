import React, { useState, useEffect } from 'react';
const TimelinePage = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [state,setState] = useState({
        leftSlide: 471.181,
        rightSlide: 492.955
    });
    const [drag, setDrag] = useState({
        width: 16.774,
        left: 476.181
    })
    useEffect(() => {
        const queryLeft = document.getElementsByClassName("timeline__slide--left");
        const querRight = document.getElementsByClassName("timeline__slide--right");
        const moveLeft = (e) => {
            setState({
                leftSlide: e.pageX - 835.13
            })
            setDrag({
                width: state.rightSlide - (e.pageX - 835.13),
                left: e.pageX - 835.13 + 3
            })
        }
        const moveRight = (e) => {
            setState({
                rightSlide: e.pageX - 835.13
            })
            /* setDrag({
                width: e.pageX - 1016.13
            }) */
        }
        querRight[0].addEventListener('mousedown', (e) => {
            querRight[0].classList.add('timeline__slide--dragging');
            document.addEventListener('mousemove', moveRight);
        })
        queryLeft[0].addEventListener('mousedown', (e) => {
            queryLeft[0].classList.add('timeline__slide--dragging')
            document.addEventListener('mousemove', moveLeft);
        })
        document.addEventListener('mouseup', (e) => {
            queryLeft[0].classList.remove('timeline__slide--dragging');
            document.removeEventListener('mousemove', moveLeft);
            document.removeEventListener('mousemove', moveRight)
        })   
    }, []);
    if(state.leftSlide <= (848 - 835.13)){
        setState({
            leftSlide: 848 - 835.13 + 1
        })
    }
    if(state.leftSlide > 492.955){
        setState({
            rightSlide: 492.955
        })
    }
    if(state.rightSlide <= (848 - 835.13)){
        setState({
            rightSlide: 848 - 835.13 + 1
        })
    }
    if(state.rightSlide > 492.955){
        setState({
            rightSlide: 492.955
        })
    }
    if(drag.left <= (848 - 835.13 + 1)){
        setDrag({
            left: 848 - 835.13 + 3
        })
    }
    return (
        <div className="timeline__wrapper active">
            <div className="timeline__container"></div>
            <div style={{position: 'absolute', top: '2.5rem', right: '1rem', bottom: 'unset', left: '1rem'}}>
                <div className='timeline__slider'>
                    <div className='timeline__chart'>
                        <svg width='100%' height='84'></svg>
                    </div>
                    <div className='timeline__ticks'>
                        <div className="timeline__year">2021</div>
                        <div className="timeline__tick" style={{left: '4.48182px'}}>
                            <div className="timeline__tick__text">06</div>
                        </div>
                        {/* <div className="timeline__year" style={{left: '244.259px'}}>2022</div> */}
                    </div>
                    <div className="timeline__drag" style={{width: `${drag.width}px`, left: `${drag.left}px`, backgroundColor: 'rgb(0,8,2)'}}></div>
                    <div className="timeline__slide timeline__slide--left" style={{left: `${state.leftSlide}px`}}></div>
                    <div className="timeline__slide timeline__slide--right" style={{left: `${state.rightSlide}px`}}></div>
                </div>
            </div>
        </div>
    );
}

export default TimelinePage;
