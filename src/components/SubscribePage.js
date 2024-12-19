import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faStar, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../AuthContext';

const API_URL = 'http://localhost:8081';

function SubscribePage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const plans = [
    { name: '12 Month Plan', price: '32.5$/mo' },
    { name: '6 Month Plan', price: '33.5$/mo' },
    { name: '3 Month Plan', price: '35.5$/mo' },
    { name: 'Monthly Plan', price: '37.5$/mo' }
  ];
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ title: '', rating: '', comment: '' });
  const [editReview, setEditReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boxesResponse, reviewsResponse] = await Promise.all([
          fetch(`${API_URL}/boxes`),
          fetch(`${API_URL}/reviews`),
        ]);

        if (!boxesResponse.ok || !reviewsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const boxesData = await boxesResponse.json();
        const reviewsData = await reviewsResponse.json();

        setBoxes(boxesData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('You must be logged in to submit a review.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      console.log('Submitting review:', newReview);
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });
      console.log('Review response:', response);
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      const addedReview = await response.json();
      console.log('Review added:', addedReview);
      setReviews([...reviews, addedReview]);
      setNewReview({ title: '', rating: '', comment: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleReviewUpdate = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('You must be logged in to update a review.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/reviews/${editReview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editReview),
      });
      console.log('Review update response:', response);
      if (!response.ok) {
        throw new Error('Failed to update review');
      }
      setReviews(reviews.map(review => (review.id === editReview.id ? editReview : review)));
      setEditReview(null);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleReviewDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Review delete response:', response);
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      setReviews(reviews.filter(review => review.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCheckout = () => {
    if (!selectedPlan) {
      alert('Please select a subscription plan before proceeding to checkout.');
      return;
    }
    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
    navigate('/checkout');
  };

  return (
    <section className="subscribe-page py-16 flex flex-col items-center bg-blur">
      <div className="container mx-auto flex flex-col md:flex-row items-start">
        <div className="w-full md:w-1/2 p-4">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            renderArrowPrev={(onClickHandler, hasPrev, label) => hasPrev && (
              <button type="button" onClick={onClickHandler} title={label} className="custom-arrow custom-arrow-left">
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) => hasNext && (
              <button type="button" onClick={onClickHandler} title={label} className="custom-arrow custom-arrow-right">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            )}
          >
            {boxes.map((box) => (
              <div key={box.id} className="relative">
                <img src={box.imageUrl} alt={box.name} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col items-start">
          <h2 className="text-4xl font-bold mb-8 text-dark-gray">Choose Your Subscription Plan</h2>
          <ul className="space-y-4 w-full">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`plan-option ${selectedPlan && selectedPlan.name === plan.name ? 'selected' : ''}`}
                onClick={() => handlePlanSelect(plan)}
                style={{
                  backgroundColor: selectedPlan && selectedPlan.name === plan.name ? '#FFD700' : '#FFFFFF',
                  color: selectedPlan && selectedPlan.name === plan.name ? '#FFFFFF' : '#000000',
                  borderColor: selectedPlan && selectedPlan.name === plan.name ? '#FFD700' : '#D3D3D3',
                }}
              >
                <div className="flex justify-between">
                  <span>{plan.name}</span>
                  <span>{plan.price}</span>
                </div>
              </div>
            ))}
          </ul>
          <div className="checkout-button-container mt-4">
            <button
              onClick={handleCheckout}
              className="bg-dark-gray text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              Go to Checkout
            </button>
          </div>
        </div>
      </div>

      <div className="w-full p-4 mt-16 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-dark-gray">Reviews</h2>
        {isLoggedIn ? (
          <form onSubmit={editReview ? handleReviewUpdate : handleReviewSubmit} className="review-form mb-8">
            <h3 className="text-2xl font-bold mb-4">{editReview ? 'Edit Your Review' : 'Submit Your Review'}</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={editReview ? editReview.title : newReview.title}
                onChange={(e) => (editReview ? setEditReview({ ...editReview, title: e.target.value }) : setNewReview({ ...newReview, title: e.target.value }))}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Rating</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={editReview ? editReview.rating : newReview.rating}
                onChange={(e) => (editReview ? setEditReview({ ...editReview, rating: e.target.value }) : setNewReview({ ...newReview, rating: e.target.value }))}
                required
                min="1"
                max="5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Comment</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                value={editReview ? editReview.comment : newReview.comment}
                onChange={(e) => (editReview ? setEditReview({ ...editReview, comment: e.target.value }) : setNewReview({ ...newReview, comment: e.target.value }))}
                required
              />
            </div>
            <button className="w-full bg-dark-gray text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
              {editReview ? 'Update Review' : 'Submit Review'}
            </button>
          </form>
        ) : (
          <p className="text-red-500">You must be logged in to submit a review.</p>
        )}
        <div className="mt-8">
          {reviews.map((review) => (
            <div key={review.id} className="review-container mb-4 p-4 rounded-lg shadow-lg">
              <div className="review-header flex justify-between">
                <h3 className="text-xl font-semibold">{review.title}</h3>
                <p className="review-date text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="review-rating mb-2">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p>{review.comment}</p>
              {isLoggedIn && (
                <div className="review-actions mt-2 flex">
                  <button
                    onClick={() => setEditReview(review)}
                    className="text-blue-500 mr-4"
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button
                    onClick={() => handleReviewDelete(review.id)}
                    className="text-red-500"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-arrow-left,
        .custom-arrow-right {
          position: absolute;
          bottom: 10px;
          z-index: 2;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          padding: 0.5rem;
          cursor: pointer;
        }
        .custom-arrow-left {
          left: 45%;
        }
        .custom-arrow-right {
          right: 45%;
        }
        .plan-option.selected {
          background-color: #FFD700; /* Gold color for the selected plan */
          color: #FFFFFF; /* White text for the selected plan */
          border-color: #FFD700; /* Match border color with background */
        }
      `}</style>
    </section>
  );
}

export default SubscribePage;