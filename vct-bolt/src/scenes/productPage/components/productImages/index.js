import React, {Component} from 'react';
import Lightbox from 'react-images';
import PropTypes from 'prop-types';

export default class ProductImages extends Component{

    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array
    };

    constructor(props){
        super(props);

        this.state = {
            lightboxIsOpen: false
        };

        this.closeLightbox = this.closeLightbox.bind(this);
    }

    closeLightbox(){
        this.setState({
            lightboxIsOpen: !this.state.lightboxIsOpen
        })
    }



    render(){
        const {title,items} = this.props;

        const images = items.filter(item => item).map(item => {return {src:item, alt:title, caption:title}});
        console.log(images);
        return(
            <div className="product-full-images">
                <Lightbox
                    images={images}
                    isOpen={this.state.lightboxIsOpen}
                    onClose={this.closeLightbox}
                />

            </div>

        )
    }

}