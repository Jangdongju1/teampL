export const getFormattedDate = (dateStr :string)=>{
    const date = new Date(dateStr);

    const year = date.getFullYear();
    // month는 0부터 시작하므로 +1 을해주고 .pad로 2자리 숫자를 맞추기 위해 앞에 0을 붙여줌.
    const month = String(date.getMonth()+1).padStart(2,"0");
    const day = String(date.getDate()).padStart(2,"0");

    return `${year}-${month}-${day}`;
}