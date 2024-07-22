import { CustomButtons } from './button';

export const List = (props) => {
    if(props.list && Array.isArray(props.list)){
        return (
            <>
            {
                props.list.map(function(value, index){
                  return (
                    <>
                      <li 
                      key={`li-${index}`}
                      class="list-group-item">
                        {value}
                          <CustomButtons label={"Delete"} onClick={() => props.deleteTask(value)} color="danger" />
                          <CustomButtons label={"Update"} onClick={() => props.updateTask(value)} color="primary" />
                        </li>
                    </>
                  )
                })
              }  
              </>
        )
    }


    return <></>
}