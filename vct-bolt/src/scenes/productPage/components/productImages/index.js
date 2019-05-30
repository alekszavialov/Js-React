import React, { Component } from 'react';
import Lightbox from 'react-images';
import PropTypes from 'prop-types';

import './styles.css';

export default class ProductImages extends Component {

    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            lightboxIsOpen: false,
            images: this.props.items.filter(item => item).map(item => {
                return { src: item, alt: this.props.title, caption: this.props.title };
            }),
            currentImage: 0
        };

        this.openLightbox = this.openLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
    }

    openLightbox(imageId) {
        this.setState({
            lightboxIsOpen: !this.state.lightboxIsOpen,
            currentImage: imageId
        });
    }

    closeLightbox() {
        this.setState({
            lightboxIsOpen: !this.state.lightboxIsOpen
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }

    render() {
        const {images} = this.state;
        return (
            <div className="product-full-images">
                <h2>{this.props.title}</h2>
                {images.map((item,index) =>
                    <a key={item.src} onClick={() => this.openLightbox(index)}><img src={item.src} alt={item.alt}/></a>
                )}
                <Lightbox
                    images={images}
                    isOpen={this.state.lightboxIsOpen}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    onClose={this.closeLightbox}
                    currentImage={this.state.currentImage}
                    showImageCount={false}
                />
            </div>

        );
    }

}