import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'reactstrap';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { Button as MaterialButton, IconButton } from '@material-ui/core'
import dropDownIcon from '../../assets/images/dropdown-workpackage-icon.svg';
import { getTimeAgo } from "../../utils/dateFormatter";
import { useHistory } from "react-router";
import Routes from "../../constants/routes";

const ExpandIcon = () => {
	return (
		<IconButton className='background-light-blue'>
			<img src={dropDownIcon} />
		</IconButton>
	)
}

const useStyles = makeStyles((theme) => ({
	MuiAccordionroot: {
		"&.MuiAccordion-root:before": {
			backgroundColor: "white"
		}
	}
}));
const WorkpackageCard = ({ wpData }) => {
	const classes = useStyles();
  const history = useHistory();

	const [estimatedCost, setEstimatedCost] = useState(0);
	const [isEstimatedCostEditMode, setIsEstimatedCostEditMode] = useState(false);

	return (
		<>
			<Accordion elevation={0} classes={{ root: classes.MuiAccordionroot }} className='mt-3' id='wp-accordion'>
				<AccordionSummary
					expandIcon={<ExpandIcon />}
					aria-controls="panel1a-content"
					className='text-center'
					id="panel1a-header"
				>
					<Col>
						<span className='font-weight-bold'>
							{wpData.workPackagePk.id}
						</span>

					</Col>
					<Col>
						<span className='font-weight-bold'>
							{wpData.initialEstimate}
						</span>
					</Col>
          <Col>
						<span className='font-weight-bold'>
							{wpData.allocatedInitialEstimate}
						</span>
					</Col>
          <Col>
						<span className='font-weight-bold'>
							{wpData.budget}
						</span>
					</Col>
          <Col>
						<span className='font-weight-bold'>
							{wpData.allocatedBudget}
						</span>
					</Col>
					{/* <Col>
						<span className='font-weight-bold ml-3'>
							{wpData.priority}
						</span>
					</Col> */}
					<Col>
						<span className='font-weight-bold'>
							{getTimeAgo(wpData.audit.createdAt)}
						</span>
					</Col>
					<Col>
						<span className='font-weight-bold'>
							{getTimeAgo(wpData.dueAt)}
						</span>
					</Col>
				</AccordionSummary>
				<AccordionDetails>
					<Col>
						<div className='p-2 text-left'>
							<div>
								<span className='font-weight-bold'>
									Purpose
                                    </span>
								<span className='font-weight-bold ml-5'>
									{wpData.workPackageName}
								</span>
							</div>
							<div className='mt-3'>
								<span className='font-weight-bold'>
									Description
                                    </span>
								<span className='font-weight-bold ml-5'>
									{wpData.description}
								</span>
							</div>
						</div>
					</Col>
					<Col className='ml-auto text-right'>
						<div className='p-2 text-right'>
							<div>
								<span className='font-weight-bold'>
                  Cost At Completion
                                    </span>
								{
									isEstimatedCostEditMode ?
										<>

										</> :
										<>
										</>
								}
								<span className='font-weight-bold text-color-primary-yonder ml-5'>
									${wpData.costAtCompletion}
								</span>
							</div>
							<div className='mt-3'>
								<span className='font-weight-bold'>
									Charge
                                    </span>
								<span className='font-weight-bold text-color-primary-yonder ml-5'>
									${wpData.charged}
								</span>
							</div>
							<div className='text-right mt-4'>
								<MaterialButton
									variant='outlined'
									className='mt-4 btn-border-text-blue font-weight-bold p-2'
                  onClick={() => history.push(`/project/${wpData.workPackagePk.projectID}/wp/${wpData.workPackagePk.id}`)}
								>
									View sub work packages
                                    </MaterialButton>
							</div>
						</div>
					</Col>
				</AccordionDetails>
			</Accordion>
			{/*<Row>*/}
			{/*    <Col></Col>*/}
			{/*    <Col></Col>*/}
			{/*    <Col></Col>*/}
			{/*</Row>*/}
		</>
	)
}

export default WorkpackageCard;