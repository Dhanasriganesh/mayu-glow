import StatsService from '../services/statsService.js';

export const getOverviewStats = async (req, res, next) => {
  try {
    const stats = await StatsService.getOverviewStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

export const getSalesStats = async (req, res, next) => {
  try {
    const range = req.query.range || 30;
    const stats = await StatsService.getSalesStats(range);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
