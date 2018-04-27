import { RECEIVE_LISTINGS, RECEIVE_LISTING, REMOVE_LISTING, RECEIVE_LISTING_ERRORS } from "./types";
import * as ListingApiUtil from "../util/listing_api_util";

const receiveListings = listings => ({
	type: RECEIVE_LISTINGS,
	listings,
});

const receiveListing = listing => ({
	type: RECEIVE_LISTING,
	listing,
});

const removeListing = listing => ({
	type: REMOVE_LISTING,
	listing,
});

export const receiveListingErrors = errors => ({
  type: RECEIVE_LISTING_ERRORS,
  errors
});

export const fetchListings = () => dispatch =>
	ListingApiUtil.fetchListings().then(
    listings => dispatch(receiveListings(listings)),
    errors => dispatch(receiveListingErrors(errors))
	);

export const createListing = formListing => dispatch =>
	ListingApiUtil.createListing(formListing).then(
    listing => dispatch(receiveListing(listing)),
    errors => {
      console.log('failed');
      dispatch(receiveListingErrors(errors));
    }
	);


export const deleteListing = listingId => dispatch =>
	ListingApiUtil.deleteListing(listingId).then(listing =>
		dispatch(removeListing(listing))
	);
