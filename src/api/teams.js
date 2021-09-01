export default {
  teamsList(id) {
    return `competitions/${id}/teams/?plan=TIER_ONE`
  },
  teamMatches(id) {
    return `/teams/${id}/matches/`
  },
}
