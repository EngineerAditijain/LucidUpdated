import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import Lottie from 'lottie-react';

import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import loadingAnimation from '../assets/LoadingAnimation.json';
import '../PublishLoader/loader.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2)
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1)
	}
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 5,
	borderRadius: 2,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: 'rgba(145,126,201,.4)'
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 2,
		backgroundColor: theme.palette.mode === 'light' ? '#008D9C' : '#008D9C'
	}
}));



export const PublishLoader= ({ showEmail, emailHeader, message, setOpen, requestId, emailId, name, organizationName, open, maxCountDown }) => {
	const maxCount = maxCountDown || 10;
	const [progress, setProgress] = useState(0);
	const [countdown, setCountdown] = useState(maxCount);

	useEffect(() => {
		const progressTimer = setInterval(() => {
			setProgress((previousProgress) => previousProgress + 100 / maxCount);
			setCountdown((previousCountdown) => previousCountdown - 1);
		}, 1000);
		if (countdown === 0) {
			setProgress((previousProgress) => previousProgress - (maxCount / 2) * (100 / maxCount));
			setCountdown(maxCount / 2);
		}
		return () => {
			clearInterval(progressTimer);
		};
	}, [countdown]);


	

	return (
		<Box className="body-publish-Loader">
			<BootstrapDialog aria-labelledby="dialog-title" open={open} data-backdrop="false" className="publish-assistant-dialog md:rounded-xl rounded-lg">
				<Box className="px-10 lg:w-80">
					<Lottie animationData={loadingAnimation} loop={true} />
				</Box>
				<DialogTitle id="dialog-title" sx={{ m: 0, p: 2 }} className="dailog-title flex justify-start sm:justify-center text-gray-600 sm:text-xl text-lg">
					{'Please Wait !'}
				</DialogTitle>
				<Box className="flex flex-col justify-center align-middle">
					<BorderLinearProgress className="linearProgress m-2 " variant="determinate" value={progress} />
				</Box>
				<DialogContent>
					<Box className="publish-content flex items-center pl-[15px]  pb-[20px] sm:p-0">
						<Box className="sm:w-full w-[300px]">
							<Box className="text-sm 2xl:text-base italic font-semibold mt-0 sm:mt-[5px] sm:w-100vw ">
								{' '}
								{message ||
									`Hold on tight! We're processing your request in
`}{' '}
								{countdown} seconds
							</Box>
						</Box>
					</Box>
				</DialogContent>
				
			</BootstrapDialog>
		</Box>
	);
};
