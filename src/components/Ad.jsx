import React, { Component } from 'react';

class Ad extends Component {
    componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render () {
        return (
            <div className='ad'>
                <ins className="adsbygoogle"
                     style={{display: "block"}}
                     data-ad-client="ca-pub-2942965289729484"
                     data-ad-slot="3007813394"
                     data-ad-format="auto"></ins>
            </div>
        );
    }
}

export default Ad;
