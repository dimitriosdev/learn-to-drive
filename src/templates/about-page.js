import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Content, { HTMLContent } from '../components/Content'
import { AutoplaySlider } from '../components/AwesomeSlider'


export const AboutPageTemplate = ({ title, intro, testimonials, content, contentComponent }) => {
  const PageContent = contentComponent || Content;
  const slides = [];
  const images = (intro.blurbs.map(i => {
    const slide = {};
    
    slide["source"] = i.image.childImageSharp.fluid.src;
    console.log(slide)
    slides.push(slide);
  }))
  const slider = (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={6000}
    >
      <div data-src="http://www.magnumdrivingschooledinburgh.co.uk/wp-content/uploads/2018/09/Test-Drive-Tips-800x600.jpg" />
      <div data-src="http://www.magnumdrivingschooledinburgh.co.uk/wp-content/uploads/2018/09/Kratom-and-Driving-1024x576.jpg" />
    </AutoplaySlider>
  );
  return (
    <section className="section section--gradient">
          {slider}
      <div className="container">
        <div className="columns">
          <div className="column is-7 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            {intro && (<Features gridItems={intro.blurbs} />)}
            {testimonials && (<Testimonials testimonials={testimonials} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  testimonials: PropTypes.array,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        intro={post.frontmatter.intro}
        testimonials={post.frontmatter.testimonials}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
        testimonials {
          author
          quote
        }
      }
    }
  }
`