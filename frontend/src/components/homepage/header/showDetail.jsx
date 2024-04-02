import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: a,s
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ShowDetail({ open, setOpen,selectedDomainDetail}) {
    const handleClose = () => setOpen(false);
    

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        <>
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 4 , justifyContent:"space-between"}}>
                                    <div className='flex flex-col gap-4 '>
                                        <p style={{fontSize:"1.2rem", fontWeight:"bold"}}>Hosted zone name :</p>
                                        <Typography id="modal-modal-title" >
                                            {selectedDomainDetail?.Name}
                                        </Typography>
                                        <p style={{fontSize:"1.2rem", fontWeight:"bold"}}>Hosted zone ID</p>
                                        <Typography id="modal-modal-title" >
                                       {selectedDomainDetail?.Id}
                                        </Typography>
                                        <p style={{fontSize:"1.2rem", fontWeight:"bold"}}>Description</p>
                                        <Typography id="modal-modal-title" >
                                       -
                                        </Typography>
                                    </div>
                                    
                                    <div className='ml-7'>
                                        <p style={{fontSize:"1.2rem", fontWeight:"bold"}}>ResourceRecordSetCount</p>
                                        <Typography id="modal-modal-title" >
                                            {selectedDomainDetail?.ResourceRecordSetCount}
                                        </Typography>
                                    </div>
                                </div>
                                {/* <img src={Edit} onClick={() => setEdit(true)} /> */}

                            
                        </>
                    }

                </Box>
            </Modal>
        </div>
    );
}