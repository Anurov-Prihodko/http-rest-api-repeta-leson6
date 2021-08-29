import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
// import { ImSpinner } from 'react-icons/im';

import ImageGallery from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/Searchbar';
import { fetchImages, NUMBER_OF_PHOTOS } from './services/serviceApi';
import Button from './components/Button/Button';
// import shortid from 'shortid';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  NEED_LOADING: 'needLoading',
};

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isMoreAvailable: false,
    error: null,
    status: null,
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return window.scrollY;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { query, page, images } = this.state;
    if (this.state.status === Status.NEED_LOADING) {
      this.setState({ status: Status.PENDING });

      fetchImages(query, page)
        .then(results => {
          const resultsCount = results.hits.length;
          if (resultsCount === 0) {
            this.setState({
              error: new Error(`No search results for ${query}`),
              status: Status.REJECTED,
            });

            return;
          }
          const isMoreAvailable = this.checkAvailability(resultsCount);

          this.setState({
            images: [...images, ...results.hits],
            isMoreAvailable,
            status: Status.RESOLVED,
          });
        })
        .then(() => {
          if (page !== 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        })
        .catch(error => {
          this.setState({ error, status: Status.REJECTED });
        });
    }
  }
  handleSearchSubmit = query => {
    this.setState({ images: [], query, page: 1, status: Status.NEED_LOADING });
  };

  handleLoadMore = () => {
    this.setState(() => ({
      page: this.state.page + 1,
      status: Status.NEED_LOADING,
    }));
  };

  checkAvailability = itemsLength => {
    return !(itemsLength < NUMBER_OF_PHOTOS);
  };

  render() {
    const { error, status, isMoreAvailable, images } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {status === Status.REJECTED && <h2>{error.message}</h2>}
        <ImageGallery items={images} />
        {status === Status.PENDING && (
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        )}
        {status === Status.RESOLVED && isMoreAvailable && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
      </div>
    );
  }
}

export default App;
