import React from "react";
import Particles from 'react-particles-js';

function AnimationGic(props) {
    return (
        <div className={"animationGcer"} >
            <Particles
            params={{
                "particles": {
                    "number": {
                        "value": 50
                    },
                    "size": {
                        "value": 2
                    }
                },
                "interactivity": {
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        }
                    }
                }
            }} />
        </div>
    );
}
export  default AnimationGic