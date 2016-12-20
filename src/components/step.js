import React, { Component } from 'react';
// import OAuthSimple from 'oauthsimple'
// import Yelp from 'yelp';

import OauthSignature from 'oauth-signature';
import N from 'nonce';
import axios from 'axios';
import Qs from 'querystring';
import _ from 'lodash';


class Step extends Component {
  constructor(props) {
    super(props);

    this.createState();
  }

  request_yelp(set_parameters, callback) {
    /* The type of request */
    const httpMethod = 'GET';

    /* The url we are using for the request */
    const url = 'http://api.yelp.com/v2/search';

    /* We can setup default parameters here */
    const default_parameters = {
      location: 'San+Francisco',
      sort: '2'
    };

    /* We set the require parameters here */
    const required_parameters = {
      oauth_consumer_key: this.state.yelpKeys.consumerKey,
      oauth_token: this.state.yelpKeys.token,
      oauth_nonce: N(),
      oauth_timestamp: N().toString().substr(0, 10),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0'
    };

    /* We combine all the parameters in order of importance */
    const parameters = _.assign(default_parameters, set_parameters, required_parameters);

    /* We set our secrets here */
    const consumerSecret = this.state.yelpKeys.consumerSecret;
    const tokenSecret = this.state.yelpKeys.tokenSecret;

    const signature = OauthSignature.generate(httpMethod, url, parameters,
                                              consumerSecret, tokenSecret,
                                              { encodeSignature: false });

    /* We add the signature to the list of paramters */
    parameters.oauth_signature = signature;

    /* Then we turn the paramters object, to a query string */
    const paramURL = Qs.stringify(parameters);

    /* Add the query string to the url */
    const apiURL = `${url}?${paramURL}`;

    /* Then we use request to send make the API Request */
    // axios(apiURL, (error, response, body) => {
    //   // console.log(callback(error, response, body));
    //   console.log(error, response, body);
    // });

    axios.get(apiURL)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createState() {
    const yelpKeys = {
      // Pull keys from .env.js
    };

    const searchParams = {
      term: 'lunch',
      radius: '2000',
      limit: 5,
      openNow: true
    };

    this.state = {
      latlng: `${this.props.step.start_location.lat()},${this.props.step.start_location.lng()}`,
      yelpKeys: yelpKeys,
      searchParams: searchParams,
    };
  }

  searchQuery() {
    const searchQuery = `term=${this.state.searchParams.term}` +
                    `&ll=${this.state.latlng}` +
                    `&radius=${this.state.searchParams.radius}` +
                    `&limit=${this.state.searchParams.limit}` +
                    `&open_now=${this.state.searchParams.openNow}`;

    return searchQuery;
  }

  findBusinesses() {
    // const yelp = new Yelp({
    //   consumer_key: this.state.yelpKeys.consumerKey,
    //   consumer_secret: this.state.yelpKeys.consumerSecret,
    //   token: this.state.yelpKeys.token,
    //   token_secret: this.state.yelpKeys.tokenSecret,
    // });
    //
    // yelp.search({ term: 'food', location: 'Montreal' })
    // .then((data) => {
    //   console.log('Yelp Success: ', data);
    // })
    // .catch((err) => {
    //   console.error('Yelp Error: ', err);
    // });


    // const oauth = new OAuthSimple(this.state.yelpKeys.consumerKey, this.state.yelpKeys.tokenSecret);
    // const request = oauth.sign({
    //   action: 'GET',
    //   path: 'https://api.yelp.com/v2/search',
    //   parameters: this.searchQuery,
    //   signatures: {
    //                 api_key: this.state.yelpKeys.consumerKey,
    //                 shared_secret: this.state.yelpKeys.consumerSecret,
    //                 access_token: this.state.yelpKeys.token,
    //                 access_secret: this.state.yelpKeys.tokenSecret
    //               }
    // });
    //
    // fetch(request.signed_url, { method: 'GET' })
    //   .then((response) => {
    //     console.log('Yelp Resposne: ', response);
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log('Yelp Data: ', data);
    //   })
    //   .catch((error) => {
    //     console.log('Yelp Error:', error);
    //   });
    //
    // return 'Place One, Place Two';
  }

  yelpInfo() {
    this.request_yelp({}, () => console.log());

    return (
      <div>
        <div>Query: {this.searchQuery()}</div>
        <div>Businesses: {this.findBusinesses()}</div>
      </div>
    );
  }


  render() {
    // console.log('Step props: ', this.props.step);
    // console.log('Step state: ', this.state);
    return (
      <li className='list-group-item'>
        <div>
          <div>LAT: {this.props.step.start_location.lat()}</div>
          <div>LNG: {this.props.step.start_location.lng()}</div>
          <div>Instuctions: {this.props.step.instructions}</div>
          <div>{this.yelpInfo()}</div>
        </div>
      </li>
    );
  }
}

export default Step;
