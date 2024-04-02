
import AWS from 'aws-sdk';

//helper function ......................

const extractHostedZoneIds = (data) => {
    return data.map((zone) => {
        return {
            ...zone,
            Id: zone.Id.split('/hostedzone/')[1]
        };
    });
};

//hostedZone operation
export const createHostedZone = async (request, response) => {
    let { domainName } = request.body;
    const route53 = new AWS.Route53();
    const params = {
        CallerReference: String(new Date().getTime()), // Unique string to identify the request
        Name: domainName, // The name of the domain
        HostedZoneConfig: {
            Comment: `Hosted zone for ${domainName}`,
            PrivateZone: false, // Change to true for a private hosted zone
        },
    };

    try {
        const data = await route53.createHostedZone(params).promise();
        console.log('Hosted zone created:', data);
        response.status(200).json({
            message: "Hosted zone created successfully",
            hostedZoneId: data.HostedZone.Id,
        });
    } catch (err) {
        console.error('Error creating hosted zone:', err);
        response.status(500).json({
            message: "Failed to create hosted zone",
        });
    }
}

// Delete hosted zone operation
// Delete hosted zone operation
// Delete hosted zone operation
export const deleteHostedZone = async (request, response) => {
    const { hostedZoneId } = request.body;
    const route53 = new AWS.Route53();

    try {
        // First, list all resource record sets in the hosted zone
        const listParams = {
            HostedZoneId: hostedZoneId
        };
        const listData = await route53.listResourceRecordSets(listParams).promise();

        // Exclude NS records from deletion
        const recordsToDelete = listData.ResourceRecordSets.filter(recordSet => recordSet.Type !== 'NS');

        // Delete each non-NS resource record set
        const deletePromises = recordsToDelete.map(async (recordSet) => {
            const deleteParams = {
                HostedZoneId: hostedZoneId,
                ChangeBatch: {
                    Changes: [
                        {
                            Action: 'DELETE',
                            ResourceRecordSet: recordSet
                        }
                    ]
                }
            };
            await route53.changeResourceRecordSets(deleteParams).promise();
        });

        // Wait for all deletions to complete
        await Promise.all(deletePromises);

        // Now, delete the hosted zone
        const deleteHostedZoneParams = {
            Id: hostedZoneId
        };
        const deleteHostedZoneData = await route53.deleteHostedZone(deleteHostedZoneParams).promise();
        console.log('Hosted zone deleted:', deleteHostedZoneData);

        response.status(200).json({
            message: "Hosted zone deleted successfully",
        });
    } catch (err) {
        console.error('Error deleting hosted zone:', err);
        response.status(500).json({
            message: "Failed to delete hosted zone",
        });
    }
}




export const getTotalActiveHostedZones = async (request, response) => {
    const route53 = new AWS.Route53();
    const params = {};

    try {
        const data = await route53.listHostedZones(params).promise();
        const totalHostedZones = data.HostedZones.length;
        console.log('Total active hosted zones:', totalHostedZones);
        response.status(200).json({
            totalHostedZones: totalHostedZones,
            data:extractHostedZoneIds(data.HostedZones)
        });
    } catch (err) {
        console.error('Error getting total active hosted zones:', err);
        response.status(500).json({
            message: "Failed to fetch total active hosted zones",
        });
    }
}


//Records Opearation...............................................
export const createRecordSet = async (request, response) => {
    let {subdomainname,type,TTL,IPaddress,hostedZoneId}=request.body;
    const route53 = new AWS.Route53();
    const params = {
        ChangeBatch: {
            Changes: [
                {
                    Action: 'CREATE',
                    ResourceRecordSet: {
                        Name: subdomainname, // Change the DNS name as needed
                        Type: type,
                        TTL: TTL,
                        ResourceRecords: [
                            {
                                Value: IPaddress,
                            },
                        ],
                    },
                },
            ],
        },
        HostedZoneId: hostedZoneId, // Replace with your hosted zone ID for mooo.com
    };

    try {
        const data = await route53.changeResourceRecordSets(params).promise();
        console.log('Record set created:', data);
        response.status(200).json({
            message:"success"
        })
    } catch (err) {
        console.error('Error creating record set:', err);
        response.status(500).json({
            message:"server down try after some time"
        })
    }
}

export const deleteRecordSet= async(request, response)=> {
    let {Name,Type,TTL,ResourceRecords,hostedZoneId}=request.body;
    const route53 = new AWS.Route53();
    const params = {
        ChangeBatch: {
            Changes: [
                {
                    Action: 'DELETE',
                    ResourceRecordSet: {
                        Name: Name, // Change the DNS name as needed
                        Type: Type,
                        TTL: TTL,
                        ResourceRecords: ResourceRecords,
                        
                    },
                },
            ],
        },
        HostedZoneId: hostedZoneId, // Replace with your hosted zone ID for mooo.com
    };

    try {
        const data = await route53.changeResourceRecordSets(params).promise();
        console.log('Record set deleted:', data);
        response.status(200).json({
            message:"Record Deleted Successfully"
        })
    } catch (err) {
        console.error('Error deleting record set:', err);
        response.status(404).json({
            message:"server down try after some time"
        })
    }
}

export const updateRecordSet = async (request, response) => {
    let {Name,Type,TTL,ResourceRecords,hostedZoneId}=request.body;
    const route53 = new AWS.Route53();
    const params = {
        ChangeBatch: {
            Changes: [
                {
                    Action: 'UPSERT',
                    ResourceRecordSet: {
                        Name: Name, // Change the DNS name as needed
                        Type: Type,
                        TTL: TTL,
                        ResourceRecords: ResourceRecords
                    },
                },
            ],
        },
        HostedZoneId: hostedZoneId,
    };

    try {
        const data = await route53.changeResourceRecordSets(params).promise();
        console.log('Record set updated:', data);

        // Check if any new records were created
        if (data.ChangeInfo.Status === 'PENDING') {
            console.log('Record set update is pending.');
        }

        response.status(202).json({
            message: "Record Detail Updated Successfully"
        })
    } catch (err) {
        console.error('Error updating record set:', err);
        response.status(500).json({
            message: "Failed to update record detail"
        });
    }
}

 export const  getAllRecordSets=async(request, response)=> {
    const {hostedZoneId} = request.query;
    const route53 = new AWS.Route53();
    const params = {
        HostedZoneId: hostedZoneId, // Replace with your hosted zone ID for mooo.com
    };

    try {
        const data = await route53.listResourceRecordSets(params).promise();
        // console.log('All record sets:', data.ResourceRecordSets);
        response.status(200).json({
            records :data.ResourceRecordSets
        })
    } catch (err) {
        console.error('Error getting all record sets:', err);
        response.status(500).json({
            message: "Failed to fetch record detail"
        });
    }
}