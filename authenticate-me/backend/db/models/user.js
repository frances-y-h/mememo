"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error("Cannot be an email.");
						}
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
			avatarUrl: {
				type: DataTypes.TEXT,
				defaultValue:
					"https://img.freepik.com/free-vector/honey-comb-pattern_225004-641.jpg?t=st=1651206994~exp=1651207594~hmac=7b6665183684d0230ec73e90477cc28abf9f0261b5c0f002eee8e94d87f63240&w=1800",
			},
			scartchPad: {
				type: DataTypes.TEXT,
			},
		},
		{
			defaultScope: {
				attributes: {
					exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
				},
			},
			scopes: {
				currentUser: {
					attributes: { exclude: ["hashedPassword"] },
				},
				loginUser: {
					attributes: {},
				},
			},
		}
	);

	User.associate = function (models) {
		User.hasMany(models.Tag, { foreignKey: "userId" });
		User.hasMany(models.Notebook, { foreignKey: "userId" });
		User.hasMany(models.Favorite, { foreignKey: "userId" });
	};

	User.prototype.toSafeObject = function () {
		const { id, username, email } = this;
		return { id, username, email };
	};

	User.prototype.validatePassword = function (password) {
		return bcrypt.compareSync(password, this.hashedPassword.toString());
	};

	User.getCurrentUserById = async function (id) {
		return await User.scope("currentUser").findByPk(id);
	};

	User.login = async function ({ credential, password }) {
		const { Op } = require("sequelize");
		const user = await User.scope("loginUser").findOne({
			where: {
				[Op.or]: {
					username: credential,
					email: credential,
				},
			},
		});
		if (user && user.validatePassword(password)) {
			return await User.scope("currentUser").findByPk(user.id);
		}
	};

	User.signup = async function ({ username, email, password }) {
		const hashedPassword = bcrypt.hashSync(password);
		const user = await User.create({
			username,
			email,
			hashedPassword,
		});
		const currentUser = await User.scope("currentUser").findByPk(user.id);
		return currentUser;
	};

	return User;
};
