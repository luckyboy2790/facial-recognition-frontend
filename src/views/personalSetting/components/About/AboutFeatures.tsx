const AboutFeatures = () => {
    return (
        <div className="flex flex-col gap-6 pb-6 border-b-slate-500 border-b-[1px] border-solid">
            <h6>Features</h6>
            <div>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                    <li>Employee Management (HRIS)</li>
                    <li>Time and Attendance Management</li>
                    <li>Employee Time Tracking</li>
                    <li>Shift Management</li>
                    <li>Leave Management</li>
                    <li>Reporting and Analytics</li>
                    <li>Multi-company</li>
                    <li>Manager and Employee self-service</li>
                </ul>
            </div>
            <div>
                <p>Version 1.6</p>
                <p>Copyright (c) 2020 Codefactor. All rights reserved.</p>
            </div>
        </div>
    )
}

export default AboutFeatures
