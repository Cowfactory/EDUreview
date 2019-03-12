# EDUreview
The place to research into and share the educational experience

## How to run locally
1. Make sure Mongo daemon is running 
2. Create a .env file in project root w/ following keys:

    * `DATABASE_URL=`

    * `JWT_SECRET=`

    Example:

    * `DATABASE_URL=mongodb://localhost:27017/edureview`

    * `JWT_SECRET=any_secret_here`

3. Run `npm install` project root


4. Run `npm run build` in `/client` directory


5. Navigate to `http://localhost:3000`


## How to seed db
`npm run seed`


### Credits
Seeder .csv file courtesy of Karl Hughes
https://github.com/karllhughes/colleges