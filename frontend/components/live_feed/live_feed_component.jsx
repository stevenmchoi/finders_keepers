import React from "react";
import Slide from "react-reveal/Slide";
import ListingIndexItemContainer from "./listing_index_item_container";
import ListingShowContainer from "../listing_show/listing_show_container";
import TransitionGroup from "react-transition-group/TransitionGroup";

class LiveFeed extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	showingDisplayModal: false,
		// 	clickedListing: null,
		// };
		this.renderListingShowModal = this.renderListingShowModal.bind(this);
		// this.openListingShowModal = this.openListingShowModal.bind(this);
		// this.closeListingShowModal = this.closeListingShowModal.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);

		this.groupProps = {
			appear: true,
			enter: true,
			exit: true,
		};
	}

	componentDidMount() {
		this.props.fetchListings();
	}

	handleOpenListing(listing) {
		this.props.closeListing();
		this.props.openListing(listing._id);
	}


	renderListingShowModal() {
		if (this.props.clickedListingId) {
			return (
				<ListingShowContainer
					closeListingShowModal={this.props.closeListing}
				/>
			);
		} else {
			return <div className="to-be-decided" />;
		}
	}

	handleMouseLeave() {
		this.props.clearCurrentListing();
	}

	render() {
		return (
			<div className="listing-show-level" onMouseLeave={this.handleMouseLeave}>
				{this.renderListingShowModal()}
				<div className="feed-index">
					<TransitionGroup {...this.groupProps}>
						{this.props.listings
							.sort((listingA, listingB) => {
								let dateA = new Date(listingA.updatedAt);
								let dateB = new Date(listingB.updatedAt);

								return dateB - dateA;
							})
							.map(listing => {
								return (
									<div onClick={() => this.handleOpenListing(listing)} key={listing._id}  >
										<ListingIndexItemContainer 
											listing={listing}
										/>
									</div>
								);
							})}
					</TransitionGroup>
				</div>
			</div>
		);
	}
}

export default LiveFeed;
