import React, { Component } from "react";
import { toast } from "react-toastify";
import CircuitBreaker from 'opossum';
import Spinner from '../spinner';
import NoEvents from './noEvents';
import EventsList from './eventsList';
import { AuthorizedPage } from '../../services/authService';
import { getAll } from '../../services/eventService';

const circuitBreakerOptions = {
  timeout: 2000, // If our function takes longer than 2 seconds, trigger a failure
  errorThresholdPercentage: 1, // Trip circuit if any error at all
  resetTimeout: 10000 // After 10 seconds, try again.
};

class Events extends Component {
  constructor(params) {
    super(params);
    this.state = { loading: true, events: [], errors: [], showForm: false };
    this.breaker = new CircuitBreaker(async () => await getAll(), circuitBreakerOptions);
  }

  async componentDidMount() {
    this.breaker.fallback(() => {
      this.setState({ errors: ["Sorry, circuit breaker tripped when loading events!"] });
    });
    this.breaker.on('success', result => {
      if (result.succeeded) {
        this.setState({ events: result.events });
      } else {
        this.setState({ errors: result.errors });
      }
      this.setState({ loading: false });
    });
    this.breaker.on('timeout', () => {
      console.log("Circuit breaker is open due to timeout");
      toast.error('Sorry, circuit breaker tripped when loading events!');
    });
    this.breaker.on('halfOpen', () => {
      console.log("Circuit breaker is now half open");
      this.setState({ loading: true });
      this.loadEvents();
    });
    this.loadEvents();
  }

  loadEvents() {
    this.breaker.fire().catch(e => console.error(e));
  }

  showForm = e => {
    e.preventDefault();
    this.setState({ showForm: true });
  }

  hideForm = e => {
    if (e) e.preventDefault();
    this.setState({ showForm: false });
    this.componentDidMount();
  }

  render() {
    return (
      <AuthorizedPage redirectToPath="/login">
        { this.state.loading ?
          <div className="text-center"><Spinner /></div> :
          (this.state.events.length === 0 ?
            <NoEvents show={this.state.showForm} showForm={this.showForm} hideForm={this.hideForm} /> :
            <EventsList events={this.state.events} show={this.state.showForm} showForm={this.showForm} hideForm={this.hideForm} />
          )
        }
      </AuthorizedPage>
    );
  }
}

export default Events;
