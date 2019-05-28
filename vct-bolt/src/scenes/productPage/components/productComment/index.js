import React, { Component } from 'react';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';

import AddCommentBlock from './components/addCommentForm';
import './styles.css';

export default class ProductCommentBlock extends Component {

    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.array,
        changeFormField: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            isVisibleCommentForm: false
        };

        this.toggleAddComment = this.toggleAddComment.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
    }

    changeFormField(data) {
        this.props.changeFormField(data);
    }

    toggleAddComment() {
        this.setState({
            isVisibleCommentForm: !this.state.isVisibleCommentForm
        });
    }

    render() {
        const { title, data } = this.props;
        return (
            <div className="product-comments">
                <div className="product-comments-head">
                    <h2>Отзывы о {title}</h2>
                    <img
                        src="https://vct1.com/img/reviews.jpg.pagespeed.ce.0rCS136i8J.jpg"
                        alt={`Отзывы о ${title}`}
                        title={`Оставить отзыв о ${title}`}
                        onClick={this.toggleAddComment}
                    />
                    {this.state.isVisibleCommentForm &&
                    <AddCommentBlock changeFormField={this.changeFormField}/>
                    }
                </div>
                {data.length > 0 ?
                    data.map(item =>
                        <div className="product-comments-item"
                             key={item.comment.split('').reduce((a, b) => {
                                 a = ((a << 5) - a) + b.charCodeAt(0);
                                 return a & a;
                             }, 0)}>
                            <p className="product-comments-item-name">{item.date} {item.name}</p>
                            <span
                                className={`product-comments-item-${item.bought === 1 ? 'buy' : 'not'}`}>{item.bought === 1 ? 'Купил' : 'Не купил'}</span>
                            <div className="product-comments-item-stars">
                                <ReactStars
                                    count={5}
                                    value={Number(item.rank)}
                                    edit={false}
                                    size={24}
                                    color2="#ffd700"/>
                            </div>
                            <p className="product-comments-item-comment">{item.comment}</p>
                        </div>
                    ) :
                    <p className="product-comments-item-empty">Комментариев еще нет. Оставьте свой</p>
                }

            </div>
        );
    }

}