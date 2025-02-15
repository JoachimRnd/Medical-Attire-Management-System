const express = require('express');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const cors = require('cors');

const employeeRouter = require('./routes/employee');
const historyRouter = require('./routes/borrow_history');
const reportsRouter = require('./routes/reports');
const roomsRouter = require('./routes/rooms');
const scrubsRouter = require('./routes/scrubs');
const scrubsTypesRouter = require('./routes/scrubs_types');

const Scrub = require('./models/Scrub');
const EmailSender = require('./helper/EmailSender');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());

app.use('/employee', employeeRouter);
app.use('/history', historyRouter);
app.use('/reports', reportsRouter);
app.use('/rooms', roomsRouter);
app.use('/scrubs', scrubsRouter);
app.use('/scrubs/types',scrubsTypesRouter);


// scheduled Task which runs every day at midnight (time flexible)
// -> checks all scrubs which are borrowed => if some are overdue -> sends mail to person
cron.schedule('0 0 * * *', async () => {
    const resObj = await new Scrub().getAllOverdueScrubs();
    if (resObj.status !== 200) {
        console.log(resObj.response);
        return;
    }

    resObj.response.forEach(oScrub => {
        const to = oScrub.email;
        const subject = 'Overdue scrub returnal!';

        const return_date = new Date(oScrub.return_date);
        const today = new Date();
        const diffDays = Math.ceil(Math.abs(return_date - today) / (1000 * 60 * 60 * 24)) - 1;

        const text = `Dear ${oScrub.name},\nplease return the ${oScrub.count} ${oScrub.description} scrubs you borrowed.` +
            `You are ${diffDays} days over the given return date. If you lost these scrubs please mark them as lost.`;
        const email = new EmailSender(to, subject, text);
        email.setUp();
        email.send();
    });
}, {});

app.listen(port, () => console.log(`Listening on port ${port}`));
