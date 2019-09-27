import React from 'react';

const withDataFetching = props => WrappedComponent => {
  class WithDataFetching extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading: props.loadingMessage,
      };
    }

    async componentDidMount() {
      try {
        const data = await fetch(props.dataSource);
        const dataJSON = await data.json();

        if (dataJSON) {
          this.setState({
            data: dataJSON,
            loading: false,
          });
        }
      } catch (error) {
        this.setState({
          loading: error.message,
        });
      }
    }

    render() {
      const { data, loading } = this.state;

      return <WrappedComponent data={data} loading={loading} {...this.props} />;
    }
  }

  WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;

  return WithDataFetching;
};

export default withDataFetching;
