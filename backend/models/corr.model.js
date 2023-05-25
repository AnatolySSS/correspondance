export default (sequelize, Sequelize) => {
  const CorrApp = sequelize.define("CorrApp", {
    incoming_number: {
      type: Sequelize.STRING,
    },
    incoming_date: {
      type: Sequelize.DATE,
    },
    outgoing_number: {
      type: Sequelize.STRING,
    },
    registration_date: {
      type: Sequelize.DATE,
    },
    doc_type: {
      type: Sequelize.STRING,
    },
    correspondante: {
      type: Sequelize.STRING,
    },
    court_name: {
      type: Sequelize.STRING,
    },
    plaintiff_name: {
      type: Sequelize.STRING,
    },
    soo_number: {
      type: Sequelize.STRING,
    },
    execution_date: {
      type: Sequelize.DATE,
    },
    executor: {
      type: Sequelize.STRING,
    },
    executor_transfer_date: {
      type: Sequelize.DATE,
    },
    answer_type: {
      type: Sequelize.STRING,
    },
    response_preparation_date: {
      type: Sequelize.DATE,
    },
    referral_method: {
      type: Sequelize.STRING,
    },
    comment: {
      type: Sequelize.STRING,
    },
    reason: {
      type: Sequelize.STRING,
    },
    entered_in_the_accounting_table: {
      type: Sequelize.STRING,
    },
    check_date: {
      type: Sequelize.DATE,
    },
    correction: {
      type: Sequelize.STRING,
    },
    responsible_for_document_analysis: {
      type: Sequelize.STRING,
    },
    document_analysis_date: {
      type: Sequelize.DATE,
    },
    summary: {
      type: Sequelize.STRING,
    },
    fixed: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: 'corr_app_lib',
  });

  return CorrApp;
};