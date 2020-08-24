import React, {Component} from 'react';
import BookListItem from '../book-list-item'
import './book-list.css'
import {connect} from 'react-redux';
import {withBookstoreService} from '../hoc';
import {booksLoaded, booksRequested} from '../../actions';
import {bindActionCreators} from 'redux';
import {compose} from '../../utils';
import Spinner from "../spinner";

class BookList extends Component {

    componentDidMount() {
        //1. receive data
        const {bookstoreService, booksLoaded, booksRequested} = this.props;
        booksRequested();
        bookstoreService.getBooks()
            .then((data) => booksLoaded(data));
    }

    render() {
        const {books, loading} = this.props;

        if (loading) {
            return <Spinner/>
        }
        return (
            <ul className="book-list">
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}><BookListItem book={book}/></li>
                        )
                    })
                }
            </ul>
        );
    }
}

const mapStateToProps = ({books, loading}) => {
    return {books, loading};
};

const mapDispatchToProps = {
    booksLoaded, booksRequested

    // return {
    //     booksLoaded: (newBooks) => {
    //         dispatch(booksLoaded(newBooks));
    //     }
    // };
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);

