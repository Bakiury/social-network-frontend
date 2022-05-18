const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const getDayMonthYear = (dateString: Date) => {
    const date = new Date(dateString);

    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        dayWeek: days[date.getDay()],
        yearDay: date.getFullYear(),
        time: (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
            + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };
}

export default getDayMonthYear;