import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../../config/config';

const models = [User, File, Appointment];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.conection = new Sequelize(databaseConfig);
        this.conectionportal = new Sequelize(databaseConfig);

        models
            .map(model => {
                if (models.model === 'User') {
                    return model.init(this.conectionportal);
                }
                return model.init(this.conection);
            })
            .map(
                model =>
                    model.associate && model.associate(this.conection.models)
            );
    }

    mongo() {
        this.mongo.conection = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
        });
    }
}

export default new Database();
