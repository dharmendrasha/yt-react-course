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
                        {value.name}
                          <CustomButtons label={"Delete"} onClick={() => props.deleteTask(value._id)} color="danger" />
                          <CustomButtons label={"Update"} onClick={() => props.updateTask(value._id, value.name)} color="primary" />
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