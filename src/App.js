import './App.scss';
import {useEffect, useState} from "react";

function App() {
    const [bgColor, setBgColor] = useState('rgb(255, 255, 0)');
    const [temperature, setTemperature] = useState(0)
    const [incrementInterval, setIncrementInterval] = useState(null);
    const [decrementInterval, setDecrementInterval] = useState(null);
    useEffect(() => {
        // take that -50 deg is a 100%, that means that +50 deg is a 0%
        let current_percentage = (50 + temperature) / 100
        // find current rgb value
        let r_c = 255 * current_percentage;
        let g_c = temperature > 25 ? 0 : 50;
        let b_c = 255 - (255 * current_percentage);
        setBgColor(`rgba(${r_c},${g_c},${b_c}, ${current_percentage > 0.49 ? current_percentage : 0.8})`)
    }, [temperature]);

    const increment = () => {
        setTemperature(temperature + 1)
    }
    const incrementPress = () => {
        setIncrementInterval(setInterval(() => {
            setTemperature((prevTemperature) => prevTemperature + 1);
        }, 100));
    };

    const stopIncrement = () => {
        clearInterval(incrementInterval);
        setIncrementInterval(null);
    };

    const decrement = () => {
        setTemperature(temperature - 1)
    }

    const decrementPress = () => {
        setDecrementInterval(setInterval(() => {
            setTemperature((prevTemperature) => prevTemperature - 1);
        }, 100));
    };

    const stopDecrement = () => {
        clearInterval(decrementInterval);
        setDecrementInterval(null);
    };

    return (
        <div className="App">
            <div className="outer-box">
                <div className="circle" style={{background: bgColor}}>
                    <div className="count">{temperature} C°</div>
                </div>
                <div className="controls">
                    <button onClick={increment}
                            onMouseDown={incrementPress}
                            onMouseUp={stopIncrement}
                            onMouseLeave={stopIncrement}>+
                    </button>
                    <button onClick={decrement}
                            onMouseDown={decrementPress}
                            onMouseUp={stopDecrement}
                            onMouseLeave={stopDecrement}>-</button>
                </div>
            </div>
        </div>
    );
}

export default App;
