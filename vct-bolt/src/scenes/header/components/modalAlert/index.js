import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class ModalAlert extends Component {

    static propTypes = {
        text: PropTypes.string,
        onClose: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
    }

    onClose(){
        this.props.onClose();
    }

    render() {
        return (
            <div className="modal-alert-bg closeCard" onClick={this.onClose}>
                <div className="modal-alert">
                    {this.props.text.length > 0 &&
                    <h2>Ваш заказ принят. Номер вашего заказа {this.props.text}. Ожидайте пока с вами свяжется
                        менеджер.</h2>
                    }
                    {this.props.text.length === 0 &&
                    <h2>Произошла ошибка. Попробуйте еще раз.</h2>
                    }
                    <button onClick={this.onClose}>Закрыть</button>
                </div>
            </div>
        );
    }
}