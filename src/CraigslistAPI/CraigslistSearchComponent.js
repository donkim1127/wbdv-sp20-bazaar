import React from "react";
import ListComponent from "../components/ListComponent"
import {searchListings} from "../services/CraigslistService"
import {defaultCity} from "../constants"


export default class CraigslistSearchComponent extends React.Component {

    componentDidMount() {
        let searchQuery = this.props.match.params.searchPost;
        let searchCity = this.props.match.params.city;
        if (searchCity) {
            this.setState({city: searchCity})
        }
        if (searchQuery) {
            this.getListings(searchCity, searchQuery)
        }
    }

    state = {
        listings : [],
        searchQuery: '',
        city: ''
    }

    getListings = (searchCity, searchQuery) => {
        if (!searchCity.replace(/\s/g, '')) {
            searchCity = defaultCity;
        }
        searchCity = this.normalizeCity(searchCity);
        this.props.history.push(`/search/${searchCity}/${searchQuery}`)
        searchListings(searchCity, searchQuery, 20)
            .then(results => this.setState({
                listings : results
            }))
    }

    normalizeCity = (cityString) => {
        return cityString.toLowerCase().replace(/\s/g, '')
    }

    render() {
        return (
            <div>
            <h2>Search Listings</h2>
            <input className={`form-control`}
                    onChange={e => this.setState({searchQuery: e.target.value})}
                    value={this.state.searchQuery}
                    placeHolder={`Search for Listings`}/>
            <input className={`form-control`}
                    onChange={e => this.setState({city: e.target.value})}
                    value={this.state.city}
                    placeHolder={`City to search for listings in`}/>

            <button className={`btn btn-success btn-block`}
                    onClick={() => this.getListings(this.state.city, this.state.searchQuery)}>
                        Search
            </button>
            <ul className={`list-group mt-2`}>
                {this.state.listings.map((listing, idx) =>
                        <ListComponent
                            idx={idx}
                            listing={listing}
                            city={this.state.city}
                        />
                )

                }
            </ul>
        </div>
        )
    }
}