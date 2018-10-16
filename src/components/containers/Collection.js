import React, { Component } from 'react'
import api from '../../api';

import './Collection.css';

export default class App extends Component {
    state = {
        parallax: [],
        collectionName: this.props.collectionName
    } 
    componentDidMount = async () => {
        const { collectionName } = this.state;
        const params = { collectionName }

        try {
            const response = await api.images.getImages(params);
            this.setState({ parallax: response.data.nature })
            
        } catch (error) {
            console.log('Get images error', error.stack);
        }
    }
    
  render() {
    const { parallax } = this.state;

    return (
    <div>
        {parallax.length > 0 && 
        parallax.map(item => {
            return <div key={item.id}>
                <div
                    className="slide" 
                    style={{background: `url(${item.url}) no-repeat center`, backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
                </div>
            </div>
        })}
    </div>
    )
  }
}
